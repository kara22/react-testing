import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "Root";
import App from "components/App";

beforeEach(() => {
    // use moxios to fake API request in test environment
    moxios.install();
    moxios.stubRequest("https://jsonplaceholder.typicode.com/comments", {
        status: 200,
        response: [{ name: "Fetched #1" }, { name: "Fetched #2" }]
    });
});

afterEach(() => {
    moxios.uninstall();
});

it("can fetch a list of comments and display them", done => {
    // attempt to render the entire App
    const component = mount(
        <Root>
            <App />
        </Root>
    );

    component.find(".fetch-comments").simulate("click");

    // introduce a little pause to get the async moxios function
    moxios.wait(() => {
        component.update();
        expect(component.find("li").length).toEqual(2);
        done();
        component.unmount();
    });
});
