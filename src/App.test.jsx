import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';

describe('Legacy Revival Studio site', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/en');
    window.scrollTo = vi.fn();
  });

  it('renders the landing page identity', () => {
    render(<App />);

    expect(
      screen.getAllByText(/Legacy Revival Studio/i).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByText(/Old software can live again/i),
    ).toBeInTheDocument();
  });

  it('renders the multi-page navigation', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Philosophy' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Workflow' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('navigates to the projects page without a router dependency', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'Projects' }));

    expect(window.location.pathname).toBe('/en/projects');
    expect(
      screen.getByRole('heading', {
        name: /A growing archive of revived software/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders a future-ready project detail route', () => {
    window.history.pushState({}, '', '/en/projects/archive-record-template');

    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Archive Record Template' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Recovery notes/i)).toBeInTheDocument();
  });
});
