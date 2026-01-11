import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../common/Button';

describe('Button component', () => {
  test('harus menampilkan children dengan benar', () => {
    render(<Button>Klik Saya</Button>);

    const button = screen.getByText('Klik Saya');
    expect(button).toBeInTheDocument();
  });

  test('harus memanggil onClick ketika diklik', () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Klik</Button>);

    const button = screen.getByText('Klik');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('harus disabled ketika prop disabled = true', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });
});
