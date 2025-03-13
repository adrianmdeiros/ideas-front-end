// useTheme.test.ts
import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useTheme } from '../useTheme'

describe('useTheme Hook', () => {
  // Limpa o localStorage antes de cada teste
  beforeEach(() => {
    localStorage.clear()
  })

  it('deve retornar o tema padrão "dark" quando o localStorage estiver vazio', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('deve atualizar o tema com base no valor armazenado no localStorage', async () => {
    // Define um tema no localStorage
    localStorage.setItem('theme', 'light')

    const { result } = renderHook(() => useTheme())

    // Aguarda até que o hook atualize o estado para "light"
    await waitFor(() => {
      return result.current.theme === 'light'
    })

    expect(result.current.theme).toBe('light')
  })

  it('deve atualizar o estado quando setTheme for chamado', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('light')
    })

    expect(result.current.theme).toBe('light')
  })
})
