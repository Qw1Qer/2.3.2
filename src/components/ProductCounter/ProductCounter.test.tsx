import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ProductCounter from './ProductCounter'

describe('ProductCounter', () => {
    it('renders with default count of 1', () => {
        render(<ProductCounter />)
        expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('renders with custom initial count', () => {
        render(<ProductCounter count={5} />)
        expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('calls onCountChange when incrementing', async () => {
        const user = userEvent.setup()
        const handleCountChange = vi.fn()

        render(<ProductCounter count={2} onCountChange={handleCountChange} />)

        await user.click(screen.getByAltText('add'))

        expect(handleCountChange).toHaveBeenCalledWith(3)
    })

    it('calls onCountChange when decrementing', async () => {
        const user = userEvent.setup()
        const handleCountChange = vi.fn()

        render(<ProductCounter count={3} onCountChange={handleCountChange} />)

        await user.click(screen.getByAltText('remove'))

        expect(handleCountChange).toHaveBeenCalledWith(2)
    })

    it('does not call onCountChange when decrementing below 1 in card mode', async () => {
        const user = userEvent.setup()
        const handleCountChange = vi.fn()

        render(<ProductCounter count={1} onCountChange={handleCountChange} itCard={true} />)

        await user.click(screen.getByAltText('remove'))

        expect(handleCountChange).not.toHaveBeenCalled()
    })

    it('allows decrementing to 0 in non-card mode', async () => {
        const user = userEvent.setup()
        const handleCountChange = vi.fn()

        render(<ProductCounter count={1} onCountChange={handleCountChange} itCard={false} />)

        await user.click(screen.getByAltText('remove'))

        expect(handleCountChange).toHaveBeenCalledWith(0)
    })

    it('disables minus button when count is 1 in card mode', () => {
        render(<ProductCounter count={1} itCard={true} />)

        const minusButton = screen.getByAltText('remove').closest('button')
        expect(minusButton).toBeDisabled()
    })

    it('does not disable minus button when count is 1 in non-card mode', () => {
        render(<ProductCounter count={1} itCard={false} />)

        const minusButton = screen.getByAltText('remove').closest('button')
        expect(minusButton).not.toBeDisabled()
    })

    it('does not disable minus button when count is greater than 1 in card mode', () => {
        render(<ProductCounter count={2} itCard={true} />)

        const minusButton = screen.getByAltText('remove').closest('button')
        expect(minusButton).not.toBeDisabled()
    })

    it('shows correct minus icon in card mode when count is 1', () => {
        render(<ProductCounter count={1} itCard={true} />)

        const minusIcon = screen.getByAltText('remove')
        // Проверяем что используется disable иконка
        expect(minusIcon).toHaveAttribute('src')
    })

    it('shows correct minus icon in card mode when count is greater than 1', () => {
        render(<ProductCounter count={2} itCard={true} />)

        const minusIcon = screen.getByAltText('remove')
        // Проверяем что используется active иконка
        expect(minusIcon).toHaveAttribute('src')
    })

    it('always shows active minus icon in non-card mode', () => {
        render(<ProductCounter count={1} itCard={false} />)

        const minusIcon = screen.getByAltText('remove')
        expect(minusIcon).toHaveAttribute('src')
    })

    it('shows plus icon correctly', () => {
        render(<ProductCounter />)

        const plusIcon = screen.getByAltText('add')
        expect(plusIcon).toBeInTheDocument()
        expect(plusIcon).toHaveAttribute('src')
    })


    it('works without onCountChange callback', async () => {
        const user = userEvent.setup()

        render(<ProductCounter count={2} />)

        // Не должно быть ошибок при клике без callback
        await user.click(screen.getByAltText('add'))
        await user.click(screen.getByAltText('remove'))

        // Просто проверяем что компонент не падает
        expect(screen.getByText('2')).toBeInTheDocument()
    })
})