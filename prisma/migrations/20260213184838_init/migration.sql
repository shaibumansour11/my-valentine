-- CreateTable
CREATE TABLE "Valentine" (
    "id" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Valentine_pkey" PRIMARY KEY ("id")
);
