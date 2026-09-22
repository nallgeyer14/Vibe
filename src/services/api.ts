const API_BASE_URL = "http://127.0.0.1:8000";

export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "API request failed");
    }
    
    return response.json();
}
export async function checkBackend(): Promise<{ status: string }> {
  return apiRequest<{ status: string }>("/health");
}


export interface AuthResponse {
    access_token: string;
    token_type: string;
    user_id: number;
  }
  
  export async function registerUser(
    email: string,
    password: string
  ): Promise<{ id: number; email: string }> {
    return apiRequest<{ id: number; email: string }>("/users/", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
}
  
export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({
          email,
          password,
      }),
  });
}
export async function registerAndLoginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  await registerUser(email, password);
  return loginUser(email, password);
}

export interface ProfilePayload {
    name: string;
    age: number;
    school: string;
    bio?: string;
    profile_picture_url?: string;
    social_preferences?: string;
    looking_for?: string;
}
  
export async function createProfile(
    token: string,
    profile: ProfilePayload
  ) {
    return apiRequest("/profiles/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });
}
export async function updateProfile(
    token: string,
    profile: ProfilePayload
  ) {
    return apiRequest("/profiles/me", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });
  }
  export interface Interest {
    id: number;
    name: string;
  }
  
  export async function getInterests(): Promise<Interest[]> {
    return apiRequest<Interest[]>("/interests/");
}

export async function getMyProfile(
  token: string
): Promise<ProfilePayload & { id: number; user_id: number }> {
  return apiRequest<ProfilePayload & { id: number; user_id: number }>(
    "/profiles/me",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function setUserInterests(
    token: string,
    interestIds: number[]
  ) {
    return apiRequest("/interests/me", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        interest_ids: interestIds,
      }),
    });
}

export async function getUserInterests(
  token: string
): Promise<Interest[]> {
  return apiRequest<Interest[]>("/interests/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}