import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('FastCodeHomepage App Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo since it's used in App.jsx but not available in jsdom by default
    window.scrollTo = vi.fn();
  });

  it('renders the FastCode logo text', () => {
    render(<App />);
    const logoElements = screen.getAllByText(/FastCode/i);
    expect(logoElements.length).toBeGreaterThan(0);
  });

  it('renders the main slogan', () => {
    render(<App />);
    const sloganElement = screen.getByText(/기술로 비즈니스의 문제를 해결하는/i);
    expect(sloganElement).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<App />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Footprint')).toBeInTheDocument();
    expect(screen.getByText('Infrastructure')).toBeInTheDocument();
  });
});
