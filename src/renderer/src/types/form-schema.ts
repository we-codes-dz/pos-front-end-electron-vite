import { z } from 'zod'

export const userSchema = z.object({
  email: z.string(),

  password: z.string().min(8, 'Votre mot de passe doit au-moin contenir 8 caractères')
})

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Votre nom d'utilisateur doit au-moins contenir 3 caractères")
    .max(40, "Votre nom d'utilisateur ne doit pas dépasser 40 caractères"),
  parent: z.string().min(0)
})

export const productSchema = z.object({
  name: z
    .string()
    .min(3, 'Le nom du produit doit au-moins contenir 3 caractères')
    .max(40, 'Le nom du produit ne doit pas dépasser 40 caractères'),
  price: z.number().min(1).max(99999).positive(),
  description: z.string().min(0),
  category: z.number().min(1).max(99999).positive()
})
