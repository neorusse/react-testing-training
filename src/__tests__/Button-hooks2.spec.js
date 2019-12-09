// Act API with the real react-dom/test-utils.

/**
 * The Act API is available both on react-test-renderer and on react-dom/test-utils and
 *  when imported from the latter, it’s possible to use ReactDOM.render, thus mounting the
 *  React component into the Document Object Model.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

// component to test
function Button(props) {
	const [text, setText] = useState('');

	const handleClick = () => {
		setText('PROCEED TO CHECKOUT');
	};

	return <button onClick={handleClick}>{text || props.text}</button>;
}

// test logic
let container;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

describe('Button component', () => {
	test('it shows the expected text when clicked', () => {
		act(() => {
			ReactDOM.render(<Button text="SUBSCRIBE TO BASIC" />, container);
		});

		const button = container.getElementsByTagName('button')[0];
		expect(button.textContent).toBe('SUBSCRIBE TO BASIC');

		act(() => {
			button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		});

		expect(button.textContent).toBe('PROCEED TO CHECKOUT');
	});
});
