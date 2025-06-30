"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Camera, Save } from 'lucide-react'

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    university: 'Stanford University',
    major: 'Computer Science',
    graduationYear: '2025',
    bio: 'Passionate computer science student seeking software engineering internships. Experienced in Python, JavaScript, and React.',
    profileImage: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Handle save logic
    console.log('Saving profile:', profile)
  }

  const handleImageUpload = () => {
    // Handle image upload
    console.log('Upload image')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.profileImage} alt="Profile" />
              <AvatarFallback className="text-lg">
                {profile.firstName[0]}{profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" onClick={handleImageUpload}>
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG up to 2MB
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Education
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={profile.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input
                  id="major"
                  value={profile.major}
                  onChange={(e) => handleInputChange('major', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                value={profile.graduationYear}
                onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                className="w-32"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              placeholder="Tell us about yourself, your interests, and career goals..."
            />
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 