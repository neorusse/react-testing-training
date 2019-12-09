import React from 'react';
import { create } from 'react-test-renderer';
import Button from '../components/Button.snapshot-testing';

// SNAPSHOT TESTING
/**
 * A snapshot is like a picture of an entity at a given point in time. And guess what is
 * one of the simplest way for testing React components. With snapshot testing you can take a picture of a
 * React component and then compare the original against another snapshot later on.
 * Snapshot testing is a feature built into the Jest test runner and since it’s the default library for testing React
 */

describe('Button component', () => {
	test('Matches the snapshot', () => {
		const button = create(<Button />);
		expect(button.toJSON()).toMatchSnapshot();
	});
});
