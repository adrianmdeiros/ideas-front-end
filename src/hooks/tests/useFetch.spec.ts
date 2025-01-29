import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { useFetch } from '../useFetch'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('useFetch', () => {
  it('deve buscar dados com sucesso', async () => {
    const mockData = { message: 'Sucesso' }
    const url = 'http://example.com/success'
    
    server.use(
      http.get(url, () => HttpResponse.json(mockData))
    )

    const { result } = renderHook(() => useFetch(url))

    expect(result.current.data).toBeNull()
    expect(result.current.isFetching).toBe(true)
    expect(result.current.error).toBeNull()

    await waitFor(() => expect(result.current.isFetching).toBe(false))

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBeNull()
  })

  it('deve lidar com erros na requisição', async () => {
    const errorMessage = 'Request failed with status code 500'
    const url = 'http://example.com/error'
    
    server.use(
      http.get(url, () => HttpResponse.json(
        { message: errorMessage },
        { status: 500 }
      ))
    )

    const { result } = renderHook(() => useFetch(url))

    await waitFor(() => expect(result.current.isFetching).toBe(false))

    expect(result.current.data).toBeNull()
    expect(result.current.error).toBe(errorMessage)
  })

  it('deve atualizar dados via setData', async () => {
    const initialData = { value: 1 }
    const newData = { value: 2 }
    const url = 'http://example.com/update'
    
    server.use(
      http.get(url, () => HttpResponse.json(initialData))
    )

    const { result } = renderHook(() => useFetch(url))

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false)
      expect(result.current.data).toEqual(initialData)
    })

    result.current.setData(newData)
    
    await waitFor(() => {
      expect(result.current.data).toEqual(newData)
    })
  })

  it('deve refazer a requisição quando dependências mudarem', async () => {
    const url = 'http://example.com/deps'
    let requestCount = 0

    server.use(
      http.get(url, () => {
        requestCount++
        return HttpResponse.json({ count: requestCount })
      })
    )

    const { result, rerender } = renderHook(
      ({ deps }) => useFetch(url, deps),
      { initialProps: { deps: [1] } }
    )

    await waitFor(() => {
      expect(result.current.data).toEqual({ count: 1 })
      expect(requestCount).toBe(1)
    })

    rerender({ deps: [2] })

    await waitFor(() => {
      expect(result.current.data).toEqual({ count: 2 })
      expect(requestCount).toBe(2)
    })
  })
})