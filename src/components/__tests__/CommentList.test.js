// dependencies
import React from "react";
import { mount } from "enzyme";

//custom files
import CommentList from "components/CommentList";
import Root from "Root";

let component;

beforeEach(() => {
    const initialState = {
        comments: ["Comment 1", "Comment 2"]
    };
    component = mount(
        <Root initialState={initialState}>
            <CommentList />
        </Root>
    );
});

it("create one LI per comment", () => {
    expect(component.find("li").length).toEqual(2);
});

it("shows the text for each comment", () => {
    expect(component.render().text()).toContain("Comment 1");
    expect(component.render().text()).toContain("Comment 2");
});
