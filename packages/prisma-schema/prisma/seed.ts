import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean database
  await prisma.notificationSent.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.session.deleteMany();
  await prisma.priceHistory.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.communityMember.deleteMany();
  await prisma.community.deleteMany();
  await prisma.stockFollow.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.prediction.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.user.deleteMany();

  // Create system user for stock accounts
  const systemUser = await prisma.user.create({
    data: {
      username: 'system',
      email: 'system@pred-social.com',
      displayName: 'System',
      role: 'SYSTEM',
      passwordHash: await bcrypt.hash('system-password-not-for-login', 10),
    },
  });

  // Create demo users
  const demoUser = await prisma.user.create({
    data: {
      username: 'demo',
      email: 'demo@pred-social.com',
      displayName: 'Demo User',
      bio: 'A demo user for testing',
      role: 'USER',
      passwordHash: await bcrypt.hash('demo123', 10),
    },
  });

  const johnDoe = await prisma.user.create({
    data: {
      username: 'johndoe',
      email: 'john@example.com',
      displayName: 'John Doe',
      bio: 'Stock market enthusiast',
      role: 'USER',
      passwordHash: await bcrypt.hash('password123', 10),
    },
  });

  // Create popular Indian stocks
  const stocks = await Promise.all([
    prisma.stock.create({
      data: {
        symbol: 'RELIANCE',
        name: 'Reliance Industries Limited',
        exchange: 'NSE',
        segment: 'EQUITY',
        assetType: 'STOCK',
        isinCode: 'INE002A01018',
        lastPrice: 2550.50,
        dayChange: 25.50,
        dayChangePercent: 1.01,
        volume: BigInt(5000000),
      },
    }),
    prisma.stock.create({
      data: {
        symbol: 'TCS',
        name: 'Tata Consultancy Services Limited',
        exchange: 'NSE',
        segment: 'EQUITY',
        assetType: 'STOCK',
        isinCode: 'INE467B01029',
        lastPrice: 3450.00,
        dayChange: -15.50,
        dayChangePercent: -0.45,
        volume: BigInt(2000000),
      },
    }),
    prisma.stock.create({
      data: {
        symbol: 'HDFCBANK',
        name: 'HDFC Bank Limited',
        exchange: 'NSE',
        segment: 'EQUITY',
        assetType: 'STOCK',
        isinCode: 'INE040A01034',
        lastPrice: 1650.00,
        dayChange: 10.00,
        dayChangePercent: 0.61,
        volume: BigInt(3000000),
      },
    }),
    prisma.stock.create({
      data: {
        symbol: 'INFY',
        name: 'Infosys Limited',
        exchange: 'NSE',
        segment: 'EQUITY',
        assetType: 'STOCK',
        isinCode: 'INE009A01021',
        lastPrice: 1420.00,
        dayChange: 5.00,
        dayChangePercent: 0.35,
        volume: BigInt(4000000),
      },
    }),
    prisma.stock.create({
      data: {
        symbol: 'NIFTY',
        name: 'Nifty 50 Index',
        exchange: 'NSE',
        segment: 'EQUITY',
        assetType: 'INDEX',
        lastPrice: 22500.00,
        dayChange: 150.00,
        dayChangePercent: 0.67,
        volume: BigInt(0),
      },
    }),
  ]);

  // Create predictions
  const predictions = await Promise.all([
    prisma.prediction.create({
      data: {
        userId: demoUser.id,
        stockId: stocks.find(s => s.symbol === 'RELIANCE')!.id,
        predicate: 'GREATER_THAN',
        targetPrice: 2700.00,
        targetMetric: 'CLOSE',
        deadline: new Date('2025-06-30'),
        timeframe: 'MONTHLY',
        reasoning: 'Strong Q4 results expected with Jio and retail expansion',
      },
    }),
    prisma.prediction.create({
      data: {
        userId: johnDoe.id,
        stockId: stocks.find(s => s.symbol === 'NIFTY')!.id,
        predicate: 'GREATER_THAN_OR_EQUAL',
        targetPrice: 24000.00,
        targetMetric: 'CLOSE',
        deadline: new Date('2025-12-31'),
        timeframe: 'YEARLY',
        reasoning: 'Economic recovery and strong corporate earnings',
      },
    }),
  ]);

  // Create communities
  const communities = await Promise.all([
    prisma.community.create({
      data: {
        name: 'options-india',
        displayName: 'Options India',
        description: 'Discuss options trading strategies for Indian markets',
      },
    }),
    prisma.community.create({
      data: {
        name: 'value-investing',
        displayName: 'Value Investing',
        description: 'Long-term value investment discussions',
      },
    }),
  ]);

  // Add users to communities
  await Promise.all([
    prisma.communityMember.create({
      data: {
        userId: demoUser.id,
        communityId: communities[0].id,
        role: 'MEMBER',
      },
    }),
    prisma.communityMember.create({
      data: {
        userId: johnDoe.id,
        communityId: communities[0].id,
        role: 'MODERATOR',
      },
    }),
  ]);

  // Create follow relationships
  await prisma.follow.create({
    data: {
      followerId: demoUser.id,
      followingId: johnDoe.id,
    },
  });

  // Create stock follows
  await Promise.all([
    prisma.stockFollow.create({
      data: {
        userId: demoUser.id,
        stockId: stocks.find(s => s.symbol === 'RELIANCE')!.id,
      },
    }),
    prisma.stockFollow.create({
      data: {
        userId: demoUser.id,
        stockId: stocks.find(s => s.symbol === 'HDFCBANK')!.id,
      },
    }),
  ]);

  console.log('✅ Database seeded successfully!');
  console.log('📧 Demo login: demo@pred-social.com / demo123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 