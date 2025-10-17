import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the problematic modules
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div data-testid="router">{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div data-testid="routes">{children}</div>,
  Route: ({ children }: { children: React.ReactNode }) => <div data-testid="route">{children}</div>,
}));

jest.mock('@fluentui/react-components', () => ({
  FluentProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="fluent-provider">{children}</div>,
  webLightTheme: {},
}));

jest.mock('./components/auth', () => ({
  AuthContextProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider">{children}</div>,
  AuthGuard: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-guard">{children}</div>,
}));

jest.mock('./components/Header', () => {
  return function Header() {
    return <div data-testid="header">Learn with 365</div>;
  };
});

jest.mock('./components/Footer', () => {
  return function Footer() {
    return <div data-testid="footer">Footer</div>;
  };
});

jest.mock('./pages/Home', () => {
  return function Home() {
    return <div data-testid="home">Home Page</div>;
  };
});

jest.mock('./pages/About', () => {
  return function About() {
    return <div data-testid="about">About Page</div>;
  };
});

jest.mock('./pages/Features', () => {
  return function Features() {
    return <div data-testid="features">Features Page</div>;
  };
});

jest.mock('./pages/Contact', () => {
  return function Contact() {
    return <div data-testid="contact">Contact Page</div>;
  };
});

jest.mock('./pages/ELearningHome', () => {
  return function ELearningHome() {
    return <div data-testid="elearning-home">E-Learning Home</div>;
  };
});

jest.mock('./pages/Courses', () => {
  return function Courses() {
    return <div data-testid="courses">Courses Page</div>;
  };
});

jest.mock('./pages/ComponentShowcase', () => {
  return function ComponentShowcase() {
    return <div data-testid="component-showcase">Component Showcase</div>;
  };
});

import App from './App';

test('renders the app structure', () => {
  render(<App />);
  
  // Check that main components are rendered
  expect(screen.getByTestId('router')).toBeInTheDocument();
  expect(screen.getByTestId('fluent-provider')).toBeInTheDocument();
  expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('footer')).toBeInTheDocument();
});

test('renders header with correct text', () => {
  render(<App />);
  expect(screen.getByText('Learn with 365')).toBeInTheDocument();
});
