/**
 * Suppose you have a button component in your application and the button
 * should change its text from “SUBSCRIBE TO BASIC” to “PROCEED TO CHECKOUT” when clicked.
 *
 * It appears the component has logic, could have a state too and that means a snapshot test
 * would not be our best choice. react-test-renderer is a library for rendering React components
 * to pure JavaScript objects but it can do a lot more than creating objects. In fact we can use
 * react-test-renderer even for asserting the behaviour of our components.
 *
 * Testing the internal implementation of an object is always a bad idea. This holds true for React,
 * JavaScript, and for any programming language out there. What we can do instead is testing the component
 * by keeping in mind what the user should see. When building user interfaces the development process is driven
 * (I really hope for you) by a functional test.
 *
 * A Functional Test, or End to End test is a way of testing web applications from the user’s perspective.
 * For functional testing I love Cypress. But for now we can obtain the same result at the unit level with react-test-renderer.
 */

import React from 'react';
import { create } from 'react-test-renderer';

// component to test
class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = { text: '' };
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState(() => {
			return { text: 'PROCEED TO CHECKOUT' };
		});
	}

	render() {
		return (
			<button onClick={this.handleClick}>
				{this.state.text || this.props.text}
			</button>
		);
	}
}

// test logic
describe('Button component', () => {
	test('it shows the expected text when clicked', () => {
		const component = create(<Button text="SUBSCRIBE TO BASIC" />);
		const instance = component.root;
		const button = instance.findByType('button');
		button.props.onClick();
		expect(button.props.children).toBe('PROCEED TO CHECKOUT');
	});
});
