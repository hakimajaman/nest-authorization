/*
  Warnings:

  - You are about to drop the `AuthLogOnBrowsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `browserId` to the `AuthLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuthLogOnBrowsers" DROP CONSTRAINT "AuthLogOnBrowsers_authLogId_fkey";

-- DropForeignKey
ALTER TABLE "AuthLogOnBrowsers" DROP CONSTRAINT "AuthLogOnBrowsers_browserId_fkey";

-- AlterTable
ALTER TABLE "AuthLog" ADD COLUMN     "browserId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AuthLogOnBrowsers";

-- AddForeignKey
ALTER TABLE "AuthLog" ADD CONSTRAINT "AuthLog_browserId_fkey" FOREIGN KEY ("browserId") REFERENCES "Browser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
