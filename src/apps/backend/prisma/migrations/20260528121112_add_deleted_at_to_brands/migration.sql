-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "brands_deletedAt_idx" ON "brands"("deletedAt");
