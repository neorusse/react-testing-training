// React Test Renderer renders React components into pure JavaScript objects that are easy to use and understand.
// React Test Renderer most common use cases in a Test Driven Development (TDD) approach.

// Testing CSS className

import React from 'react';
import { create } from 'react-test-renderer';

function BtnGroup() {
	return <div className="btn-group" />;
}

test('the className of the component includes btn-group', () => {
	const root = create(<BtnGroup />).root;

	const element = root.findByType('div');

	expect(element.props.className.includes('btn-group')).toBe(true);
});
