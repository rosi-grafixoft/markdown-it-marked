/*
 * Typescript type declarations for public interface to plugin.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

export type MarkedEnv = {markedPattern?: RegExp};

export function envFromSubstrings(substrings: string[]): MarkedEnv;
export function envFromWords(substrings: string[]): MarkedEnv;

export function plugin(md: unknown): void;
