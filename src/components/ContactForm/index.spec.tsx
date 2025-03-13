// ContactForm.test.tsx
import { FormEvent } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ContactForm from '../ContactForm'

// Como o componente utiliza o Loader, vamos mocká-lo para facilitar os testes
vi.mock('../Loader', () => ({
  default: () => <div data-testid="loader">Loader</div>,
}))

describe('ContactForm Component', () => {
  it('deve renderizar os elementos do formulário (título, label, input e botão com "Salvar")', () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <ContactForm title="Contato" label="Email" isSaving={false} />
    )

    // Verifica o título (h3)
    expect(getByText('Contato')).toBeTruthy()
    // Verifica o label e o input associado
    const input = getByLabelText('Email')
    expect(input).toBeTruthy()
    // Verifica o placeholder do input
    expect(getByPlaceholderText('Digite seu Email')).toBeTruthy()
    // Verifica o texto do botão
    expect(getByText('Salvar')).toBeTruthy()
  })

  it('deve atualizar o valor do input quando o label for "Email"', () => {
    const { getByLabelText } = render(
      <ContactForm title="Contato" label="Email" isSaving={false} />
    )
    const input = getByLabelText('Email') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    expect(input.value).toBe('test@example.com')
  })

  it('deve atualizar o valor do input quando o label for "Telefone"', () => {
    const { getByLabelText } = render(
      <ContactForm title="Contato" label="Telefone" isSaving={false} />
    )
    const input = getByLabelText('Telefone') as HTMLInputElement

    fireEvent.change(input, { target: { value: '123456789' } })
    expect(input.value).toBe('123456789')
  })

  it('deve chamar a callback saveEmail com o valor do email ao submeter o formulário', () => {
    const saveEmailMock = vi.fn((_email: string, e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    })

    const { getByLabelText, container } = render(
      <ContactForm
        title="Contato"
        label="Email"
        isSaving={false}
        saveEmail={saveEmailMock}
      />
    )
    const input = getByLabelText('Email') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    // Obtém o formulário e dispara o submit
    const form = container.querySelector('form')
    if (form) fireEvent.submit(form)

    expect(saveEmailMock).toHaveBeenCalledTimes(1)
    // Verifica se o primeiro argumento passado para a função é o email digitado
    expect(saveEmailMock.mock.calls[0][0]).toBe('test@example.com')
  })

  it('deve chamar a callback savePhone com o valor do telefone ao submeter o formulário', () => {
    const savePhoneMock = vi.fn((_phone: string, e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    })

    const { getByLabelText, container } = render(
      <ContactForm
        title="Contato"
        label="Telefone"
        isSaving={false}
        savePhone={savePhoneMock}
      />
    )
    const input = getByLabelText('Telefone') as HTMLInputElement

    fireEvent.change(input, { target: { value: '123456789' } })
    const form = container.querySelector('form')
    if (form) fireEvent.submit(form)

    expect(savePhoneMock).toHaveBeenCalledTimes(1)
    expect(savePhoneMock.mock.calls[0][0]).toBe('123456789')
  })

  it('deve exibir o Loader quando isSaving for true, não exibindo o texto "Salvar"', () => {
    const { queryByText, getByTestId } = render(
      <ContactForm title="Contato" label="Email" isSaving={true} />
    )

    // Verifica se o componente Loader está sendo renderizado
    expect(getByTestId('loader')).toBeTruthy()
    // Verifica se o texto "Salvar" não está presente
    expect(queryByText('Salvar')).toBeNull()
  })
})
