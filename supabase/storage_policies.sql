-- Create a new storage bucket for menu images
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Anyone can view images
CREATE POLICY "Menu images are publicly accessible"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'menu-images' );

-- Policy: Only Admins can upload images
CREATE POLICY "Admins can upload menu images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'menu-images' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Policy: Only Admins can update images
CREATE POLICY "Admins can update menu images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'menu-images' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Policy: Only Admins can delete images
CREATE POLICY "Admins can delete menu images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'menu-images' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
