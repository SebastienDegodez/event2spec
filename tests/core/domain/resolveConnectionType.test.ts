import { describe, it, expect } from 'vitest';
import { resolveConnectionType } from '../../../src/core/domain/resolveConnectionType';

describe('resolveConnectionType', () => {
  describe('allowed connections', () => {
    it('returns "triggers" for command → domainEvent', () => {
      expect(resolveConnectionType('command', 'domainEvent')).toBe('triggers');
    });

    it('returns "feeds" for domainEvent → readModel', () => {
      expect(resolveConnectionType('domainEvent', 'readModel')).toBe('feeds');
    });

    it('returns "triggers policy" for domainEvent → policy', () => {
      expect(resolveConnectionType('domainEvent', 'policy')).toBe('triggers policy');
    });

    it('returns "executes" for policy → command', () => {
      expect(resolveConnectionType('policy', 'command')).toBe('executes');
    });

    it('returns "user action" for uiScreen → command', () => {
      expect(resolveConnectionType('uiScreen', 'command')).toBe('user action');
    });

    it('returns "displays" for readModel → uiScreen', () => {
      expect(resolveConnectionType('readModel', 'uiScreen')).toBe('displays');
    });
  });

  describe('forbidden connections', () => {
    it('returns null for domainEvent → command (direct)', () => {
      expect(resolveConnectionType('domainEvent', 'command')).toBeNull();
    });

    it('returns null for readModel → domainEvent', () => {
      expect(resolveConnectionType('readModel', 'domainEvent')).toBeNull();
    });

    it('returns null for command → readModel', () => {
      expect(resolveConnectionType('command', 'readModel')).toBeNull();
    });

    it('returns null for policy → domainEvent', () => {
      expect(resolveConnectionType('policy', 'domainEvent')).toBeNull();
    });

    it('returns null for domainEvent → domainEvent (same type)', () => {
      expect(resolveConnectionType('domainEvent', 'domainEvent')).toBeNull();
    });

    it('returns null for command → command (same type)', () => {
      expect(resolveConnectionType('command', 'command')).toBeNull();
    });

    it('returns null for readModel → readModel (same type)', () => {
      expect(resolveConnectionType('readModel', 'readModel')).toBeNull();
    });

    it('returns null for policy → policy (same type)', () => {
      expect(resolveConnectionType('policy', 'policy')).toBeNull();
    });

    it('returns null for uiScreen → uiScreen (same type)', () => {
      expect(resolveConnectionType('uiScreen', 'uiScreen')).toBeNull();
    });
  });
});
