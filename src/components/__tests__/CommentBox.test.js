// import dependencies
import React from "react";
import { mount } from "enzyme";

// import custom files
import CommentBox from "components/CommentBox";
import Root from "Root";

let component;

// before each test run this code
beforeEach(() => {
    component = mount(
        <Root>
            <CommentBox />
        </Root>
    );
});

// after each test run this code
afterEach(() => {
    component.unmount();
});

it("has a text area and a button", () => {
    expect(component.find("textarea").length).toEqual(1);
    expect(component.find("button").length).toEqual(1);
});

// function to make another beforeEach inside
describe(" the text area", () => {
    beforeEach(() => {
        component.find("textarea").simulate("change", {
            target: { value: "new comment" }
        });
        component.update();
    });

    it("has a text area that users can type in", () => {
        expect(component.find("textarea").prop("value")).toEqual("new comment");
    });

    it("when the form is submitted, text area is emptied", () => {
        component.find("form").simulate("submit");
        component.update();
        expect(component.find("textarea").prop("value")).toEqual("");
    });
});
