-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "createdById" TEXT;

-- CreateIndex
CREATE INDEX "orders_createdById_idx" ON "orders"("createdById");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
