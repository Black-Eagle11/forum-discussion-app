import Button from '../components/common/Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    children: 'Klik Saya',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const WithOnClick = {
  args: {
    children: 'Klik untuk Action',
    onClick: () => alert('Button diklik'),
  },
};
