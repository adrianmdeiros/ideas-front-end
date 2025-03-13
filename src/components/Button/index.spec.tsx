import { render, fireEvent } from '@testing-library/react';
import Button from '.';
import styles from './styles.module.css';
import { describe, it, expect, vi } from 'vitest';

describe('<Button />', () => {
  it('deve renderizar o botão com o conteúdo (children) passado', () => {
    const { getByText } = render(<Button>Teste</Button>);
    expect(document.body.contains(getByText('Teste'))).toBe(true)
  });

  it('deve chamar a função onClick quando o botão for clicado', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Clique aqui</Button>
    );
    const button = getByText('Clique aqui');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar a classe base do botão', () => {
    const { getByText } = render(<Button>Botão</Button>);
    const button = getByText('Botão');
    expect(button.className).toContain(styles.button);
  });

  it('deve aplicar a classe "primary" quando a prop primary for true', () => {
    const { getByText } = render(<Button primary>Primary</Button>);
    const button = getByText('Primary');
    expect(button.className).toContain(styles.primary);
  });

  it('deve aplicar a classe "secondary" quando a prop secondary for true', () => {
    const { getByText } = render(<Button secondary>Secondary</Button>);
    const button = getByText('Secondary');
    expect(button.className).toContain(styles.secondary);
  });

  it('deve aplicar a classe "terciary" quando a prop terciary for true', () => {
    const { getByText } = render(<Button terciary>Terciary</Button>);
    const button = getByText('Terciary');
    expect(button.className).toContain(styles.terciary);
  });

  it('deve aplicar a classe "quaternary" quando a prop quaternary for true', () => {
    const { getByText } = render(<Button quaternary>Quaternary</Button>);
    const button = getByText('Quaternary');
    expect(button.className).toContain(styles.quaternary);
  });

  it('deve aplicar a classe "transparent" quando a prop transparent for true', () => {
    const { getByText } = render(<Button transparent>Transparent</Button>);
    const button = getByText('Transparent');
    expect(button.className).toContain(styles.transparent);
  });

  it('deve aplicar a classe "link" quando a prop link for true', () => {
    const { getByText } = render(<Button link>Link</Button>);
    const button = getByText('Link');
    expect(button.className).toContain(styles.link);
  });

  it('deve aplicar a classe "gap" quando a prop gap for true', () => {
    const { getByText } = render(<Button gap>Gap</Button>);
    const button = getByText('Gap');
    expect(button.className).toContain(styles.gap);
  });

  it('deve aplicar a classe "danger" quando a prop danger for true', () => {
    const { getByText } = render(<Button danger>Danger</Button>);
    const button = getByText('Danger');
    expect(button.className).toContain(styles.danger);
  });
});
