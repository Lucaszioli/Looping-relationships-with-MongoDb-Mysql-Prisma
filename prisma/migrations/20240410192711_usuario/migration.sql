/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `Aulas` table. All the data in the column will be lost.
  - Added the required column `videoURL` to the `Aulas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Aulas` DROP COLUMN `videoUrl`,
    ADD COLUMN `videoURL` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `photoURL` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
