// How to Test a Functional State Component FSC.

/**
 *  To test FSC, we need to use the New React Testing API called Act.
 *
 * There are two ways of writing tests using the Act API.
 *  - Act API with react-test-renderer:
 *  - Act API with the real react-dom/test-utils
 */

// Act API with react-test-renderer
/**
 *  react-test-renderer is most suitable for writing snapshot tests. For any test that has to
 *  do with the DOM, react-dom/test-utils is most suitable.
 *
 * If you can live with the fact that react-test-renderer does not use any DOM, you’ll need
 * just to tweak the test a bit for Act API. That means importing act alongside with create:
 */

import React, { useState } from 'react';
import { create, act } from 'react-test-renderer';

// component to test
function Button(props) {
	const [text, setText] = useState('');

	const handleClick = () => {
		setText('PROCEED TO CHECKOUT');
	};

	return <button onClick={handleClick}>{text || props.text}</button>;
}

// test logic
describe('Button component', () => {
	test('it shows the expected text when clicked', () => {
		let component;

		act(() => {
			component = create(<Button text="SUBSCRIBE TO BASIC" />);
		});

		const instance = component.root;
		const button = instance.findByType('button');
		act(() => button.props.onClick());
		expect(button.props.children).toBe('PROCEED TO CHECKOUT');
	});
});

// Notice that both the call to create and to button.props.onClick() are wrapped in a
// callback passed to act(). That’s it if you don’t need the DOM.
// If instead you want to mount React components into the Document Object Model
// then another version of the Act API will suite you best.
