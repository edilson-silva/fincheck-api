/*
  Warnings:

  - You are about to drop the column `initial_balance` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."transactions" DROP COLUMN "initial_balance";
