interface CartProps {
  className?: string
}

const Cart = ({ className }: CartProps) => {
  return (
    <div className={`bg-white shadow-sm p-4 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Sepetim</h2>
      {/* Sepet içeriği buraya gelecek */}
    </div>
  )
}

export default Cart 