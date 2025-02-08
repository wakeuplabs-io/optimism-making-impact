-- CreateTable
CREATE TABLE "UserWhitelist" (
    "email" TEXT NOT NULL,
    "whiteListed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWhitelist_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWhitelist_email_key" ON "UserWhitelist"("email");
