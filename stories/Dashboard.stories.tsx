import React, { ComponentProps } from 'react';
import { DefaultFilterDemo } from '@app/DefaultFilter/DefaultFilterDemo';
import { Story } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/DefaultFilterDemo',
  component: DefaultFilterDemo,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof DefaultFilterDemo>> = (args) => <DefaultFilterDemo {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
