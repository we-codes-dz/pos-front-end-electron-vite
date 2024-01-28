import potatoes from '@renderer/assets/images/ads-on/001-fried-potatoes.png'
import ketchup from '@renderer/assets/images/ads-on/002-ketchup-bottle.png'
import mayonnaise from '@renderer/assets/images/ads-on/003-mayonnaise.png'
import chiliSauce from '@renderer/assets/images/ads-on/004-chili-sauce.png'

export type TSuppliesData = {
  name: string
  path: string
}

export const supplies: TSuppliesData[] = [
  { name: 'potatoes', path: potatoes },
  { name: 'ketchup', path: ketchup },
  { name: 'mayonnaise', path: mayonnaise },
  { name: 'chili sauce', path: chiliSauce }
]
