'use client'
import ProductsList from '@/components/ProductsList'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/cart'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const revalidate = 60;

const formSchema = z.object({
  adress: z.string().min(3, {
    message: 'Endereço inválido'}),
  contactInfo: z.string().min(3, {
    message: 'Informações de contato inválidas'
  }),
  paymentMethod: z.string().min(1),
  exchange: z.string().min(1).default('0')
})

function Page() {
  const { totalProductsPrice, totalPrice, deliveryFee, cartQuantity, cart } = useCart()
  const [open, setOpen] = React.useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const payments = [
    {value: 'pix', label: 'Pix'},
    {value: 'cash', label: 'Dinheiro'},
    {value: 'card', label: 'Cartão'}
  ]

  async function onSubmit (values: z.infer<typeof formSchema>) {
    const order = {
      status: 'pending',
      adress: values.adress,
      contactInfo: values.contactInfo,
      paymentMethod: values.paymentMethod,
      exchange: values.exchange, // Incluindo o troco no pedido
      products: cart,
      totalProductsPrice: totalProductsPrice + deliveryFee,
    }

    try {
      const result = await fetch('/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })

      const data = await result.json()

      toast({
        title: 'Pedido realizado com sucesso!',
        description: 'Você será redirecionado para o WhatsApp'
      })

      setTimeout(async () => {
        const response = await fetch('/api/globals/whatsapp');
        const { whatsapp } = await response.json();

        const selectedPayment = payments.find(payment => payment.value === data.doc.paymentMethod);
        const paymentLabel = selectedPayment ? selectedPayment.label : data.doc.paymentMethod

        const message = encodeURIComponent(`Olá, acabei de fazer o pedido de ${data.doc.products.length} produto${data.doc.products.length > 1 ? 's' : ''}. O valor total foi de R$${(data.doc.totalProductsPrice).toFixed(2)}, para ser entregue em: ${data.doc.adress}. Quero finalizar o pagamento via ${paymentLabel.toLowerCase()}`);
        const whatsappUrl = `https://wa.me/${whatsapp}?text=${message}`;

        router.push(whatsappUrl)
      }, 2000)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao realizar pedido',
        description: 'Tente novamente mais tarde'
      })
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adress: '',
      contactInfo: '',
      paymentMethod: 'pix',
      exchange: '0'
    }
  })

  return (
    <div className='container mt-8'>
      <h1 className='text-lg md:text-xl font-semibold'>Seu carrinho</h1>
      <p className='text-foreground/50'>Aqui você pode ver todos os produtos, fazer ajustes e finalizar a sua compra</p>
      <Separator className='my-8'/>
      <div className='flex justify-center md:justify-end items-center gap-4 mb-8'>
        <div className='flex flex-col sm:flex-row gap-2'>
          <p className='border-2 p-2 border-foreground rounded-md'><span className='font-semibold'>Subtotal: </span>R$ {totalProductsPrice.toFixed(2)}</p>
          <p className='border-2 p-2 border-foreground rounded-md'><span className='font-semibold'>Entrega: </span>R$ {cartQuantity === 0 ? '0.00' : deliveryFee.toFixed(2)}</p>
          <p className='border-2 p-2 border-foreground rounded-md'><span className='font-black'>Total: </span>R$ {cartQuantity === 0 ? '0.00' : totalPrice.toFixed(2)}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='!p-4 h-full' disabled={cartQuantity === 0}>Finalizar compra</Button>
          </DialogTrigger >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Finalizar compra</DialogTitle>
              <DialogDescription>Antes de te mandar para o WhatsApp, precisamos de algumas informações:</DialogDescription>
            </DialogHeader>
            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
              <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Escolha um meio de pagamento</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? payments.find((payment: any) => payment.value === field.value)?.label
                                : "Meio de pagamento"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Buscar meio de pagamento..." />
                            <CommandList>
                              <CommandEmpty>Nenhum método encontrado.</CommandEmpty>
                              <CommandGroup>
                                {payments.map((payment: any) => (
                                  <CommandItem
                                    key={payment.value}
                                    value={payment.value}
                                    onSelect={() => {
                                      form.setValue("paymentMethod", payment.value)
                                      setOpen(false)
                                    }}
                                  >
                                    {payment.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        payment.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                {form.watch('paymentMethod') === 'cash' && (
                  <FormField
                    control={form.control}
                    name="exchange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Troco para quanto?</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} placeholder='Ex.: R$ 50.00' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="adress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço de entrega:</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} placeholder='Bairro, rua, número da casa...' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Informação de contato:</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} placeholder='Seu número de celular' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className='mt-8'>
                  <DialogClose asChild>
                    <div className='flex gap-4'>
                      <Button type='button' variant='outline'>Cancelar</Button>
                      <Button type='submit'>Confirmar</Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <ProductsList />
    </div>
  )
}

export default Page
