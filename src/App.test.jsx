import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';

describe('Legacy Revival Studio homepage', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('renders the studio identity', () => {
    render(<App />);

    expect(
      screen.getAllByText(/Legacy Revival Studio/i).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByText(/Old software can live again/i),
    ).toBeInTheDocument();
  });

  it('renders the core principle', () => {
    render(<App />);

    expect(
      screen.getByText(/Revive first\. Rewrite only when necessary\./i),
    ).toBeInTheDocument();
  });

  it('renders the primary navigation links', () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: 'Philosophy' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Workflow' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument();
  });
});
