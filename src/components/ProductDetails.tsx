'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from 'react-hook-form'
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dialog, DialogDescription, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter, DialogClose } from './ui/dialog'
import { Input } from './ui/input'
import { useCart } from '@/context/cart'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from './ui/toast'
import Link from 'next/link'

const formSchema = z.object({
  selectedFlavour: z.string().optional(),
  quantity: z.coerce.number().int().positive(),
})

export function ProductDetails({ product }: any) {
  const flavours = product.type === 'flavour'
    ? product.flavour.map((flave: any) => ({
        label: flave.name,
        value: flave.name
      }))
    : []

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedFlavour: product.type === 'flavour' ? flavours[0]?.value : '',
      quantity: 1
    }
  })

  const { addItemToCart } = useCart()
  const { toast } = useToast()

  const onSubmit = (values: z.infer<typeof formSchema>) => {

    addItemToCart({
      productSelect: {
        selectedProductId: product.id,
        selectedProductName: product.name,
        selectedFlavour: values.selectedFlavour,
        price: product.price,
        quantity: values.quantity,
        totalProductsPrice: (product.price * values.quantity)
      }
    })

    toast({
      title: 'Sucesso',
      description: 'Produto adicionado ao carrinho',
      action: <ToastAction asChild altText='Ir para o carrinho' ><Link href={'/carrinho'}>Ir para o carrinho</Link></ToastAction>
    })
  }



  const [open, setOpen] = React.useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Comprar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar ao carrinho</DialogTitle>
          <DialogDescription>Escolha as características do produto antes de adicionar ao carrinho</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {product.type === 'flavour' ? (
              <FormField
                control={form.control}
                name="selectedFlavour"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Escolha um sabor:</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? flavours.find((flavour: any) => flavour.value === field.value)?.label
                              : "Selecione o sabor"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Buscar sabor..." />
                          <CommandList>
                            <CommandEmpty>Nenhum sabor encontrado.</CommandEmpty>
                            <CommandGroup>
                              {flavours.map((flavour: any) => (
                                <CommandItem
                                  key={flavour.value}
                                  value={flavour.value}
                                  onSelect={() => {
                                    form.setValue("selectedFlavour", flavour.value)
                                    setOpen(false)
                                  }}
                                >
                                  {flavour.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      flavour.value === field.value
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
            ) : (
              <FormField
                control={form.control}
                name="selectedFlavour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações:</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder='Por exemplo: sem morango, sem paçoca...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      min={1}
                      onInput={(e: any) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='flex gap-4'>
              <DialogClose asChild>
                <div className='flex gap-4'>
                <Button variant={'outline'}>Cancelar</Button>
                <Button type="submit">Adicionar</Button>
                </div>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetails
