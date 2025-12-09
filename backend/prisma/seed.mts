import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Mini Militia style loot...')

  // Reset
  await prisma.item.deleteMany()
  await prisma.itemCategory.deleteMany()

  // Mini Militia Categories
  const weapons = await prisma.itemCategory.create({ data: { name: 'Weapons' } })
  const armour = await prisma.itemCategory.create({ data: { name: 'Armour' } })
  const powerups = await prisma.itemCategory.create({ data: { name: 'Powerups' } })

  // Legendary Mini Militia Weapons & Items
  await prisma.item.createMany({
    data: [
      // === WEAPONS ===
      { name: "Desert Eagle",      categoryId: weapons.id,  rarity: "Epic",       levelRequirement: 1,  stats: { damage: 85,  fireRate: 0.4 } },
      { name: "AK-47",             categoryId: weapons.id,  rarity: "Rare",       levelRequirement: 5,  stats: { damage: 45,  fireRate: 0.1 } },
      { name: "M4",                categoryId: weapons.id,  rarity: "Epic",       levelRequirement: 10, stats: { damage: 55,  fireRate: 0.08 } },
      { name: "Sniper",            categoryId: weapons.id,  rarity: "Legendary",  levelRequirement:20, stats: { damage: 200, zoom: 8 } },
      { name: "Flamethrower",      categoryId: weapons.id,  rarity: "Legendary",  levelRequirement:30, stats: { damage: 120, burn: true } },
      { name: "Rocket Launcher",   categoryId: weapons.id,  rarity: "Legendary",  levelRequirement:35, stats: { damage: 300, splash: 5 } },
      { name: "Laser",             categoryId: weapons.id,  rarity: "Legendary",  levelRequirement:40, stats: { damage: 999, pierce: true } },

      // === ARMOUR ===
      { name: "Pro Pack",          categoryId: armour.id,    rarity: "Epic",       levelRequirement:15, stats: { health: 200, speedBoost: 1.2 } },
      { name: "Jetpack",           categoryId: armour.id,    rarity: "Legendary",  levelRequirement:25, stats: { fly: true, fuel: 10 } },
      { name: "Shield",            categoryId: armour.id,    rarity: "Rare",       levelRequirement:8,  stats: { blockChance: 0.5 } },

      // === POWERUPS ===
      { name: "Double Gun",        categoryId: powerups.id, rarity: "Epic",       levelRequirement:12, stats: { dualWield: true } },
      { name: "Invisibility",      categoryId: powerups.id, rarity: "Legendary",  levelRequirement:30, stats: { invisible: 15 } },
      { name: "Health Regen",      categoryId: powerups.id, rarity: "Rare",       levelRequirement:5,  stats: { regenPerSec: 20 } },
      { name: "Nuke",              categoryId: powerups.id, rarity: "Legendary",  levelRequirement:50, stats: { killAll: true } },
    ],
  })

  console.log('Mini Militia database seeded!')
  console.log('Total items:', await prisma.item.count())
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => await prisma.$disconnect())