import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

describe('ETERNOps site', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    window.scrollTo = vi.fn();
  });

  it('renders the landing page identity', () => {
    render(<App />);

    expect(screen.getAllByText(/ETERNOps/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('heading', {
        name: /가동 중인 비즈니스의 영속성을 위한 기술 진화/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders the primary navigation', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Case Studies' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'FAQ' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Assessment' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('navigates to the services page without a router dependency', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'Services' }));

    expect(window.location.pathname).toBe('/services');
    expect(
      screen.getByRole('heading', {
        name: /운영 중인 서비스를 위한 Migration/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders a service detail route', () => {
    window.history.pushState({}, '', '/services/php-modernization');

    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'PHP Modernization' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/PHP 버전 업그레이드/i)).toBeInTheDocument();
  });
});
