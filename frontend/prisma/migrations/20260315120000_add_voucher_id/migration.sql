ALTER TABLE "VoucherTemplate" ADD COLUMN "voucherId" SERIAL;
CREATE UNIQUE INDEX "VoucherTemplate_voucherId_key" ON "VoucherTemplate"("voucherId");
