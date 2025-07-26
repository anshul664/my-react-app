// ResizeObserver Polyfill to prevent errors
(function() {
  'use strict';

  // Store the original ResizeObserver
  const OriginalResizeObserver = window.ResizeObserver;

  // Create a safe ResizeObserver wrapper
  class SafeResizeObserver extends OriginalResizeObserver {
    constructor(callback) {
      super((entries, observer) => {
        try {
          // Debounce the callback to prevent rapid firing
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
          
          this.timeoutId = setTimeout(() => {
            try {
              callback(entries, observer);
            } catch (error) {
              // Silently ignore any ResizeObserver related errors
              if (error && error.message && error.message.includes('ResizeObserver')) {
                return;
              }
              // Log other errors normally
              console.error('ResizeObserver callback error:', error);
            }
          }, 16); // ~60fps debounce
        } catch (error) {
          // Silently ignore constructor errors
          if (error && error.message && error.message.includes('ResizeObserver')) {
            return;
          }
          throw error;
        }
      });
      
      this.timeoutId = null;
    }

    observe(element) {
      try {
        super.observe(element);
      } catch (error) {
        // Silently ignore observe errors
        if (error && error.message && error.message.includes('ResizeObserver')) {
          return;
        }
        throw error;
      }
    }

    unobserve(element) {
      try {
        super.unobserve(element);
      } catch (error) {
        // Silently ignore unobserve errors
        if (error && error.message && error.message.includes('ResizeObserver')) {
          return;
        }
        throw error;
      }
    }

    disconnect() {
      try {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = null;
        }
        super.disconnect();
      } catch (error) {
        // Silently ignore disconnect errors
        if (error && error.message && error.message.includes('ResizeObserver')) {
          return;
        }
        throw error;
      }
    }
  }

  // Replace the global ResizeObserver
  window.ResizeObserver = SafeResizeObserver;

  // Also suppress any existing ResizeObserver errors
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;

  console.error = function(...args) {
    const message = args.join(' ');
    if (message.includes('ResizeObserver') || message.includes('resize')) {
      return;
    }
    originalError.apply(console, args);
  };

  console.warn = function(...args) {
    const message = args.join(' ');
    if (message.includes('ResizeObserver') || message.includes('resize')) {
      return;
    }
    originalWarn.apply(console, args);
  };

  console.log = function(...args) {
    const message = args.join(' ');
    if (message.includes('ResizeObserver') || message.includes('resize')) {
      return;
    }
    originalLog.apply(console, args);
  };

  // Global error handlers
  window.addEventListener('error', function(e) {
    if (e.message && (e.message.includes('ResizeObserver') || e.message.includes('resize'))) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  });

  window.addEventListener('unhandledrejection', function(e) {
    if (e.reason && e.reason.message && (e.reason.message.includes('ResizeObserver') || e.reason.message.includes('resize'))) {
      e.preventDefault();
      return false;
    }
  });

})(); 