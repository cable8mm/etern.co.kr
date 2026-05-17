import '@testing-library/jest-dom';

// Mock IntersectionObserver since it's not supported by jsdom
class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = IntersectionObserver;
