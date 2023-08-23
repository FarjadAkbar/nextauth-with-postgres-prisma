
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { STATUS_FORBIDDEN, STATUS_INTERNAL_SERVER_ERROR, STATUS_OK, STATUS_UNAUTHORIZED } from '@/constants';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

interface UserData {
  email: string;
  role: Role;
}

async function getUsersByRole(role: Role): Promise<NextResponse> {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: role,
      },
    });
    return NextResponse.json({ data: users }, { status: STATUS_OK });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: error.message }, { status: STATUS_INTERNAL_SERVER_ERROR });
  }
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: STATUS_UNAUTHORIZED });
    }

    const email = session.user?.email || '';
    const userData: UserData | null = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: STATUS_UNAUTHORIZED });
    }

    if (userData.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access Denied' }, { status: STATUS_FORBIDDEN });
    }

    // Fetch users with role "USER"
    return getUsersByRole('USER');
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: error.message }, { status: STATUS_INTERNAL_SERVER_ERROR });
  }
}
