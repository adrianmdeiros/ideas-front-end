import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCookies } from '../useCookies'

// 1. Declarar os mocks usando hoisted para garantir a ordem correta
const { mockGet, mockSet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
  mockSet: vi.fn()
}))

// 2. Mockar o módulo usando os mocks hoisted
vi.mock('universal-cookie', () => ({
  default: vi.fn(() => ({
    get: mockGet,
    set: mockSet
  }))
}))

describe('useCookies', () => {
  beforeEach(() => {
    // 3. Resetar os mocks antes de cada teste
    vi.clearAllMocks()
  })

  it('deve iniciar com cookiesAgreed false quando não há cookie', async () => {
    mockGet.mockReturnValue(undefined)

    const { result } = renderHook(() => useCookies())

    await waitFor(() => {
      expect(result.current.cookiesAgreed).toBe(false)
      expect(mockGet).toHaveBeenCalledWith('cookiesAgreement')
    })
  })

  it('deve definir o cookie corretamente', async () => {
    mockGet.mockReturnValue(false)

    const { result } = renderHook(() => useCookies())

    act(() => {
      result.current.agreeCookies()
    })

    expect(mockSet).toHaveBeenCalledWith(
      'cookiesAgreement',
      true,
      { secure: true }
    )

    await waitFor(() => {
      expect(result.current.cookiesAgreed).toBe(true)
    })
  })
})