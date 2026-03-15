-- CreateEnum
CREATE TYPE "VoucherStatus" AS ENUM ('ACTIVE', 'REDEEMED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "TemplateState" AS ENUM ('ACTIVE', 'INACTIVE', 'SOLD_OUT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "buyingPower" DOUBLE PRECISION NOT NULL,
    "discountPercent" INTEGER NOT NULL,
    "status" "VoucherStatus" NOT NULL DEFAULT 'ACTIVE',
    "nonce" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "redeemedAt" TIMESTAMP(3),

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoucherTemplate" (
    "id" TEXT NOT NULL,
    "voucherType" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "maxPurchase" DOUBLE PRECISION NOT NULL,
    "participation" INTEGER NOT NULL,
    "ethPrice" TEXT NOT NULL,
    "validationDate" TIMESTAMP(3) NOT NULL,
    "state" "TemplateState" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoucherTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_nonce_key" ON "Voucher"("nonce");

-- CreateIndex
CREATE UNIQUE INDEX "VoucherTemplate_voucherType_key" ON "VoucherTemplate"("voucherType");

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_wallet_fkey" FOREIGN KEY ("wallet") REFERENCES "User"("wallet") ON DELETE RESTRICT ON UPDATE CASCADE;
