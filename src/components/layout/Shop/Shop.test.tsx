import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi , beforeEach } from 'vitest'
import Shop from './Shop'

vi.mock('../../Header/Header.tsx', () => ({
    default: () => <div data-testid="header">Header</div>
}))

vi.mock('../../Catalog/Catalog.tsx', () => ({
    default: () => <div data-testid="catalog">Catalog</div>
}))

vi.mock('../../Cart/Cart.tsx', () => ({
    default: () => <div data-testid="cart">Cart</div>
}))

// Мок fetch
vi.stubGlobal('fetch', vi.fn())

describe('Shop', () => {
    beforeEach(() => {
        vi.mocked(fetch).mockClear()
    })

    it('renders all main components', () => {
        // Мокаем успешный ответ от API
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => []
        } as Response)

        render(<Shop />)

        expect(screen.getByTestId('header')).toBeInTheDocument()
        expect(screen.getByTestId('catalog')).toBeInTheDocument()
        expect(screen.getByTestId('cart')).toBeInTheDocument()
    })


    it('handles API errors without crashing', () => {
        // Мокаем ошибку API
        vi.mocked(fetch).mockRejectedValueOnce(new Error('API Error'))

        // Компонент не должен падать
        expect(() => {
            render(<Shop />)
        }).not.toThrow()
    })
})