// How do you test an AJAX call within React?

/**
 * Fetching and displaying data is one of the most common use cases for a
 * front-end library. This is usually done by contacting an external API
 * which holds some JSON for us. In React you can use componentDidMount for
 * making AJAX calls as soon as the component mounts. (And with hooks there is useEffect).
 *
 * Should you make a call to the actual API? Maybe! But some questions arise.
 * Consider this: your team runs automated testing in a CI/CD environment,
 * developers commit to the main branch 3/4 times a day. The solution is to
 * use fakes and mock. Faking external requirements is a common pattern in testing.
 *
 * Mocking is the act of replacing an actual function with a fake copy. We can also mock an API call in Jest.
 */

// Mocking Fetch API calls with Jest

/**
 * Suppose we want a Users component for fetching and displaying a list of users.
 * In our test we can mount the component and then assert on the output. Let’s give
 * it a shot by preparing a test with the Act API, this time we’ll use unmountComponentAtNode
 * from ReactDOM for cleaning up the test properly
 */

import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => {
				// make sure to check for errors
				return response.json();
			})
			.then(json => {
				this.setState(() => {
					return { data: json };
				});
			});
	}
	render() {
		return (
			<ul>
				{this.state.data.map(user => (
					<li key={user.name}>{user.name}</li>
				))}
			</ul>
		);
	}
}

// test logic
let container;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

// To mock an API with a fake JSON response. We use jest.spyOn.

/**
 * jest.spyOn “spies” on the Fetch method, available on the window object.
 * When the method is called we mock, aka replace the real Fetch with a so
 * called mock implementation (.mockImplementation). mockImplementation takes
 * a function which is our fake Fetch.
 */

describe('User component', () => {
	test('it shows a list of users', async () => {
		const fakeResponse = [{ name: 'John Doe' }, { name: 'Kevin Mitnick' }];

		jest.spyOn(window, 'fetch').mockImplementation(() => {
			const fetchResponse = {
				json: () => Promise.resolve(fakeResponse)
			};
			return Promise.resolve(fetchResponse);
		});

		await act(async () => {
			render(<Users />, container);
		});

		expect(container.textContent).toBe('John DoeKevin Mitnick');
		window.fetch.mockRestore();
	});
});
