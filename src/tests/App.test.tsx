import * as React from "react";
import { act } from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import { App } from "../App";

describe('App', function () {
    it('should display pass in number', function () {
        const container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<App />, container);
        })

        // Basic state element assertions and snapshot
        const header = container.querySelector('h1');
        expect(header.textContent).toBe("Marginal Tax Bracket Calculator")
        expect(container).toMatchSnapshot();

        // Simulate change on input elements to add tax year and salary

        // Simulate click on submit button

        // Mock fetch to return valid data and assert elements and snapshot

        // Mock fetch to return invalid data and assert elements and snapshot
    });
});