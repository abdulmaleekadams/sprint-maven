import { Button } from '@/components/ui/button';
import {  CheckSquareIcon, Paperclip, Tags, Users } from 'lucide-react';
import React from 'react'

const Featured = () => {
    return (
        <div className="space-y-2 mt-2">
          <p className="font-medium text-neutral-700 text-sm">Featured</p>
    
          <Button variant="grey" className="w-full justify-start" size="inline">
            <Users className="h-4 w-4 mr-2" />
            Members
          </Button>
          <Button
            variant="grey"
            className="w-full justify-start"
            size="inline"
          >
            <CheckSquareIcon className="h-4 w-4 mr-2 " />
            Checklists
          </Button>
          <Button
            variant="grey"
            className="w-full justify-start"
            size="inline"
          >
            <Tags className="h-4 w-4 mr-2 " />
            Tags
          </Button>
          <Button
            variant="grey"
            className="w-full justify-start"
            size="inline"
          >
            <Paperclip className="h-4 w-4 mr-2 " />
            Attachment
          </Button>
        </div>
      );
}

export default Featured