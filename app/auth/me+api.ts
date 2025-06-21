export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Authorization token required' 
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // In a real app, you would verify the JWT token here
    // For demo purposes, we'll extract user ID from token
    const tokenParts = token.split('_');
    if (tokenParts.length < 2) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid token format' 
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const userId = tokenParts[1];

    // Demo users data (in a real app, this would come from database)
    const users = {
      'demo-1': {
        id: 'demo-1',
        email: 'demo@lnmiit.ac.in',
        name: 'Demo User',
        role: 'passenger' as const,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
        contactNumber: '+91 99999 00000',
        branch: 'Demo',
        year: 'Demo',
        rating: 4.5,
        isVerified: true,
        emergencyContacts: [
          {
            id: 'ec-1',
            name: 'Emergency Contact',
            phone: '+91 99887 76655',
            relation: 'Parent',
            userId: 'demo-1'
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        ridesCompleted: 25
      },
      'student-1': {
        id: 'student-1',
        email: '21UCS045@lnmiit.ac.in',
        name: 'Arjun Sharma',
        role: 'passenger' as const,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
        contactNumber: '+91 98765 43210',
        branch: 'Computer Science',
        year: '3rd Year',
        rating: 4.7,
        isVerified: true,
        emergencyContacts: [
          {
            id: 'ec-2',
            name: 'Rajesh Sharma',
            phone: '+91 98765 43211',
            relation: 'Father',
            userId: 'student-1'
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        ridesCompleted: 87
      },
      'driver-1': {
        id: 'driver-1',
        email: '21UME023@lnmiit.ac.in',
        name: 'Priya Gupta',
        role: 'driver' as const,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
        contactNumber: '+91 87654 32109',
        branch: 'Mechanical Engineering',
        year: '4th Year',
        rating: 4.8,
        isVerified: true,
        emergencyContacts: [
          {
            id: 'ec-3',
            name: 'Suresh Gupta',
            phone: '+91 87654 32110',
            relation: 'Father',
            userId: 'driver-1'
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        ridesCompleted: 125
      }
    };

    const user = users[userId as keyof typeof users];
    
    if (!user) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'User not found' 
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        user
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Get user error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}