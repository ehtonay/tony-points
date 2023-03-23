import * as React from "react";
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import { TaxBracketTile } from "../components/TaxBracketTile";

const MOCK_PROPS = {
    min: '',
    max: '',
    taxesPaid: ''
}

describe('TaxBracketTile', function () {
    it('should display pass in number', function () {
        const container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<TaxBracketTile {...MOCK_PROPS} />, container);
        })
        const header = container.querySelector('h1');
        expect(header.textContent).toBe("Hello world React! Num: 191")
    });
});