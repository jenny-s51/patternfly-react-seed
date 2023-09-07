import React, { ComponentProps } from 'react';
import { NewCustomFilterDemo } from '@app/NewCustomFilter/NewCustomFilterDemo';
import { Story } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/NewCustomFilterDemo',
  component: NewCustomFilterDemo,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof NewCustomFilterDemo>> = (args) => <NewCustomFilterDemo {...args} />;

export const SupportStory = Template.bind({});
SupportStory.args = {
  /*👇 The args you need here will depend on your component */
};
